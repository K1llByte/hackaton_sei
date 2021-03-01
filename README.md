# MonkeSwap

MonkeSwap prints the student's calendar according to its owned classes.

## Installing

> **Note:** Must be installed `node` and `npm`

```sh
cd bb_improvised/
npm install
```

```sh
cd scheduler/
npm install
```

## Usage 

### **Blackboard Dummy Server**

```sh
cd bb_improvised/
node bin/www
```

### **MonkeSwap**

```sh
cd scheduler/
node bin/www
```

### **Blackboard Dummy Server**

```sh
cd bb_improvised/
node bin/www
```

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