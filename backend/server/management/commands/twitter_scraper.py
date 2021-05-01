from django.core.management.base import BaseCommand
from django.utils import timezone
from pytwitterscraper import TwitterScraper
import datetime
import pytz
import re

class Command(BaseCommand):
    help = 'Scrapes @VaxHuntersCan for hotspot vaccine clinics'

    def postal_codes(self, tweet):
        return re.findall("[ML][0-9][A-Z]", tweet)
    
    def age_restrictions(self, tweet):
        ages = re.findall("[1-9][0-9][+]", tweet)
        if ages:
            return ages[0][:-1]
        return 18
    
    def address(self, tweet):
        address = re.findall("\\d+[ ](?:[a-zA-Z]+[ ])+(?:Street|St|Avenue|Ave|Road|Rd|Highway|Hwy|Square|Sq|trail|Trl|Drive|Dr|Court|Ct|Parkway|Pkwy|Circle|Cir|Boulevard|Blvd)", tweet)
        if address:
            return address[0]
        return False

    def valid_tweet(self, tweet, created):
        utc=pytz.UTC
        # only want tweets from May 1st onward
        if created < utc.localize(datetime.datetime(2021, 5, 1, 0, 0, 0)): return False
        # TODO: get the time of previous run and ignore tweets before that
        if '[ON]' not in tweet: return False
        if len(self.postal_codes(tweet)) <= 0: return False
        if not self.address(tweet): return False

        return True
    
    def parse_tweet(self, tweet):
        address = self.address(tweet)
        postal_codes = self.postal_codes(tweet)
        age_group = self.age_restrictions(tweet)
        return address, postal_codes, age_group

    def handle(self, *args, **kwargs):
        VAX_HUNTERS_CAN_ID = 1373531468744552448
        time = timezone.now().strftime('%X')

        ts = TwitterScraper()
        tweets = ts.get_tweets(VAX_HUNTERS_CAN_ID, count=300)

        text = []
        urls = []
        created_at = []

        for tweet in tweets.contents:
            text.append(tweet['text'])
            urls.append(tweet['urls'][0]['url']) if len(tweet['urls']) > 0 else urls.append('')
            created_at.append(tweet['created_at'])

        for (tweet, url, created) in zip(text, urls, created_at):
            if not self.valid_tweet(tweet, created): continue
    
            address, postal_codes, age_group = self.parse_tweet(tweet)
            # TODO: insert into db
            
