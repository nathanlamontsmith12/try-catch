# Try / Catch 

An error assistance app for programmers branching out into new languages, libraries, and frameworks 

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
has_one_attached :avatar_image 
```
#### ERROR
```
id SERIAL PRIMARY KEY,
description TEXT,
user_id REFERENCES FOREIGN KEY user(id),
has_many_attached :error_images  
```
#### LINKS 
```
id SERIAL PRIMARY KEY,
error_id INTEGER REFERENCES FOREIGN KEY error(id),
url TEXT 
```
#### TAGS 
```
id SERIAL PRIMARY KEY, 
error_id INTEGER REFERENCES FORIEGN KEY error(id),
content VARCHAR(255)
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
error_id INTEGER REFERENCES FOREIGN KEY error(id)
```
#### MESSAGE_IMAGE_URL
```
id SERIAL PRIMARY KEY,
url TEXT,
size INTEGER,
message_id INTEGER REFERENCES FOREIGN KEY message(id),
```

### Through Tables

#### COLLABORATORS
```
id SERIAL PRIMARY KEY,
user_id INTEGER REFERENCES FOREIGN KEY user(id),
collaborator_id INTEGER REFERENCES FOREIGN KEY user(id)
```
#### ERROR_TAGS 
```
id SERIAL PRIMARY KEY,
error_id INTEGER REFERENCES FOREIGN KEY error(id),
tag_id INTEGER REFERENCES FOREIGN KEY tag(id)
```

### Relations 
User has many errors  
Error belongs to User  

User has many users through collaborators  
User belongs to user through collaborators  

User has many messages  
Message belongs to User  

Error has many links  
Link belongs to Error  

Error has many tags through error_tags  
Tag belongs to many Errors through error_tags  

Message has many images  
Image belongs to message  

Error has many images  
Image belongs to error  


## Wireframes 
### Home 
![home](https://github.com/nathanlamontsmith12/try-catch/blob/master/wireframes/1-home.png)
### Errors 
![errors](https://github.com/nathanlamontsmith12/try-catch/blob/master/wireframes/2-errors.png)
### Collab 
![collab](https://github.com/nathanlamontsmith12/try-catch/blob/master/wireframes/3-collab.png)
### Profile 
![profile](https://github.com/nathanlamontsmith12/try-catch/blob/master/wireframes/4-profile.png)


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
