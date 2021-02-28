# MonkeSwap

What's MonkeSwap you ask? Maybe 

## Populate Commands
```sh
cd bb_improvised/
mongoimport --jsonArray -d bb_improvised -c courses courses.json
mongoimport --jsonArray -d bb_improvised -c users users.json
```

```sh
cd scheduler/
mongoimport --jsonArray -d scheduler -c schedules schedules.json
```