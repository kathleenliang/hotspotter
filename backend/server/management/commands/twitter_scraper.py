from django.core.management.base import BaseCommand
from django.utils import timezone
from pytwitterscraper import TwitterScraper
import datetime, time, pytz, re, requests

class Command(BaseCommand):
    help = 'Scrapes @VaxHuntersCan for hotspot vaccine clinics'

    def postal_codes(self, tweet):
        postal_codes = re.findall('[ML][0-9][A-Z]', tweet)
        if len(postal_codes) > 0:
            return postal_codes
        return False
    
    def age_restrictions(self, tweet):
        ages = re.findall('[1-9][0-9][+]', tweet)
        if len(ages) > 0:
            return ages[0][:-1]
        return 18
    
    def address(self, tweet):
        address = re.findall('\\d+[ ](?:[a-zA-Z]+[ ])+(?:Street|St|Avenue|Ave|Road|Rd|Highway|Hwy|Square|Sq|trail|Trl|Drive|Dr|Court|Ct|Parkway|Pkwy|Circle|Cir|Boulevard|Blvd)', tweet)
        if len(address) > 0:
            return address[0]
        return False

    def name(self, tweet):
        name = re.findall('at (?:[A-Z][a-z.]+[ ])+(?:Arena|Centre|PS|Clinic|clinic)', tweet)
        if len(name) > 0:
            return name[0][3:]
        name = re.findall('ONLY(?:[A-Z][a-z.]+[ ])+(?:Arena|Centre|PS|Clinic|clinic)', tweet)
        if len(name) > 0:
            return name[0][4:]
        return ''

    def find_maps_info(self, text):
        key = ''
        place_id_query_string = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + text + '&inputtype=textquery&fields=place_id&key=' + key

        response = requests.get(place_id_query_string)
        place_id = response.json()['candidates'][0]['place_id']

        field_query_string = 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + place_id + '&fields=name,opening_hours,formatted_phone_number&key=' + key
        response = requests.get(field_query_string).json()

        phone_number = response['result'].get('formatted_phone_number', '')
        hours = response['result'].get('opening_hours', {}).get('weekday_text', '')
        return phone_number, hours


    def valid_tweet(self, tweet, created, start_time):
        utc=pytz.UTC

        if created < utc.localize(start_time): return False
        if '[ON]' not in tweet: return False
        if not self.postal_codes(tweet): return False
        if not self.address(tweet): return False

        return True
    
    def parse_tweet(self, tweet):
        address = self.address(tweet)
        postal_codes = self.postal_codes(tweet)
        age_group = self.age_restrictions(tweet)
        name = self.name(tweet)
        return address, postal_codes, age_group, name

    def handle(self, *args, **kwargs):
        VAX_HUNTERS_CAN_ID = 1373531468744552448
        # only consider tweets May 1 and onwards
        start_time = datetime.datetime(2021, 5, 1, 0, 0, 0)

        while True:
            now = datetime.datetime.now()

            ts = TwitterScraper()
            tweets = ts.get_tweets(VAX_HUNTERS_CAN_ID, count=300)

            text = []
            urls = []
            created_at = []

            for tweet in tweets.contents:
                text.append(tweet['text'])
                urls.append(tweet['urls'][0]['url']) if len(tweet['urls']) > 0 else urls.append('')
                created_at.append(tweet['created_at'] - datetime.timedelta(hours=4))

            for (tweet, url, created) in zip(text, urls, created_at):
                if not self.valid_tweet(tweet, created, start_time): continue
        
                address, postal_codes, age_group, name = self.parse_tweet(tweet)
                phone_number = ''
                hours = ''

                if len(name) > 0:
                    phone_number, hours = self.find_maps_info(name)
                else:
                    phone_number, hours = self.find_maps_info(address)
                
                # TODO: insert into db
            start_time = now
            time.sleep(60*60)

            
