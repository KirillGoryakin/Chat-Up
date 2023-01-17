
# 💬 Chat Up
This is a simple chat application with authorization via email or Google. It uses Firebase as backend.

## ✨ Features:
- Live chatting!
- Email + password authorization
- Google authorization
- People searching
- Framer Motion animations

## 🔧 Technologies:
- React JS
- Typescript
- Redux
- Chakra UI
- Firebase

# 👓 Live Demo
[https://chat-up-kirillgoryakin.vercel.app/](https://chat-up-kirillgoryakin.vercel.app/)

# Development
Clone repository:
```
git clone https://github.com/KirillGoryakin/Chat-Up.git
```
Install packages:
```
npm i
```
Create a Firebase project and set these ENV variables:
```
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
REACT_APP_FIREBASE_MEASUREMENT_ID=
```
### Start dev server:
```
npm run start
```

## Firestore database structure
```
Collection    Documents    Doc Fields
users      -> allUsers  -> {users: [{uid, displayName, photoUrl}, ...]}

chats      -> {chatId}  -> {
                            lastUpdated,
                            uids: ["uid1", "uid2"],
                            users: {
                              "uid1": {displayName, photoUrl},
                              "uid2": {displayName, photoUrl}
                            }}

                  Subcollection
                  -> messages -> allMessages -> {messages: [{uid, date, text}, ...]}
```

## Firestore security rules
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/allUsers {
      allow read;
      allow update:
        if request.auth != null
        && request.resource.data.users.size() == resource.data.users.size() + 1
        && request.resource.data.users.hasAll(resource.data.users);
    }
  
    match /chats/{chatId} {
    
      function isUserInChat() {
        return
          request.auth != null
          && get(/databases/$(database)/documents/chats/$(chatId))
              .data.uids.hasAny([request.auth.uid])
      }
    
      allow read: if request.auth != null;
    
      allow update: if isUserInChat();
    
      allow create:
        if request.auth != null
        && request.resource.data.uids.size() == 2
        && request.resource.data.users.size() == 2;
      
      match /messages/allMessages {
        allow read, create: if isUserInChat();
        allow update:
          if isUserInChat()
          && request.resource.data.messages.size() == resource.data.messages.size() + 1
          && request.resource.data.messages.hasAll(resource.data.messages);
      }
    }
  }
}
```