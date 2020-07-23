### README

This small node service is able to get a schedule from an API, find a relevant trip, and book it. 

### Tasks

1. Get authenticated with Bookaway   print the token.:heavy_check_mark: 

2. Get All the stations from Hanoi print count of stations.:heavy_check_mark:
 
3. Get all the stations from “Sapa” - print count of stations.:heavy_check_mark: 

4. Search trips from Hanoi to Sapa on a day of your choice for 2 passengers. Consider each city (Hanoi/Sapa) may have multiple stations. :heavy_check_mark:

5. Print the renaming credits for your account.:heavy_check_mark:

6. Book the cheapest trip that is available and has instant confirmation - print the booking reference. If no trip is instant confirmation, just book the cheapest one.:heavy_check_mark:

7. Fetch the booking until it is approved (up to 2 minutes - if it’s not auto approved in 2 minutes, you may stop).:heavy_check_mark:

8. Print the remaining credits of your account after you booked the trip.:heavy_check_mark:


### HOW TO RUN

Please 
1. declear environment variables:
 - CLIENT_ID 
 - CLIENT_SECRET

2. In the root run npm start



## Usage
In the browser run:

Task number 1
```
http://localhost:4000/access_token
```

Task number 2
```
http://localhost:4000/city_staions_number/Hanoi
```

Task number 3
```
http://localhost:4000/city_staions_number/Sapa
```

Task number 4
```
http://localhost:4000/trips/Hanoi/Sapa/2020-08-08/2
```

Task number 5
```
http://localhost:4000/credits
```

Task number 6
```
http://localhost:4000/book_the_cheapest/Hanoi/Sapa/2020-08-08/2
```

Task number 7
5f18c96e91fbb1320de5b8d2 is booking id example
```
http://localhost:4000/booking_status_pooling/5f18c96e91fbb1320de5b8d2
```

Task number 8
```
http://localhost:4000/credits
```

Additional tasks:
Task number 9 pay for booking
```
http://localhost:4000/pay/5f18c96e91fbb1320de5b8d2
```

Task number 10 get booking by id
```
http://localhost:4000/booking/5f18c96e91fbb1320de5b8d2
```

Task number 11 is booking approved
```
http://localhost:4000/booking_status/5f18c96e91fbb1320de5b8d2
```
## Notes:
1- static data saved in json files in db
2- static data updated once a day at 00:00
3- booking the trips in task 6, is for two passengers that I added the params hardcoded in real life i will take it from the user