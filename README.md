# Try / Catch 

An error assistance app for programmers 

Backend: 
Ruby 

Frontend: 
React 

Database: 
ActiveRecord  
ActiveStorage 


## Functionality 
* Users have profile with customizable thumbnail image avatar 
* Users can create error pages, which have status active or status resolved  
* Users can sort their error pages 
* Users can update error status
* Users can add images, notes, tags to their error pages
* Users can remove images, notes, and tags from error pages 
* Users can delete error pages
* Users can search and add other users as collaborators (if both users agree)
* Users can share chosen errors with chosen collaborators  
* Collaborators can update shared errors with notes and screenshots 

### Stretch 
* Auto-generate some stats that track user's errors 
* Users can send and receive messages from collaborators 
* Users can add images to their messages 
* Integration of third-party API (StackOverflow)


## Models 

#### USER
```
id SERIAL PRIMARY KEY,
username VARCHAR(128),
email TEXT,
bio TEXT,
password_digest VARCHAR(60),
is_admin BOOLEAN NOT NULL DEFAULT FALSE,
collaborators INTEGER NOT NULL DEFAULT 0,
has_one_attached :avatar_image 
```
#### ERROR
```
id SERIAL PRIMARY KEY,
description TEXT,
links TEXT,
tags VARCHAR(255),
user_id REFERENCES FOREIGN KEY user(id),
has_many_attached :error_images  
```
#### MESSAGE 
```
id SERIAL PRIMARY KEY,
to_user_id REFERENCES FOREIGN KEY user(id),
from_user_id REFERENCES FOREIGN KEY user(id),
content TEXT,
has_many_attached :message_images 
```
#### ERROR_IMAGE_URL
```
id SERIAL PRIMARY KEY,
url TEXT,
size INTEGER,
user_id INTEGER REFERENCES FOREIGN KEY user(id),
error_id INTEGER REFERENCES FOREIGN KEY error(id)
```
#### MESSAGE_IMAGE_URL
```
id SERIAL PRIMARY KEY,
url TEXT,
size INTEGER,
from_user_id INTEGER REFERENCES FOREIGN KEY user(id),
to_user_id INTEGER REFERENCES FOREIGN KEY user(id)
```
### Through Tables

#### COLLABORATORS
```
id SERIAL PRIMARY KEY,
user_id INTEGER REFERENCES FOREIGN KEY user(id),
collaborator_id INTEGER REFERENCES FOREIGN KEY user(id)
```

### Relations 
User has many errors  
Error belongs to User 

User has many collaborators  
Collaborator belongs to user 

User has many messages  
Message belongs to User 

Message has many images  
Image belongs to message 

Error has many images  
Image belongs to error 


## Wireframes 


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
