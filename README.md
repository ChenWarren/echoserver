# Echoserver description

## Server base Url

"http://echoserver-env.eba-bccqr6dt.us-east-1.elasticbeanstalk.com"

# Route Method Description body/params

## Server test

"/": GET.

## Register new user

"/register": POST.  
Body: { email, username, password, country, state" }

## Update user info

"/update": PUT.
Body: { email, username, password, country, state}

## Authentication

"/auth": POST.
Body: { email, password }

## Get books by page, 500 for each page

"/books/:p": GET.  
Params: pagenumber

## Get single book by book ID

"/books/id/:id" GET.  
Params: bookID

## Get favourite book list of the user

"/favobook": POST.  
Body: {user},(user: user's email)

## Add favourite book list

"/favobook/add": POST.  
Body: {user, bookID[...]}, (user: user's email)

## Delete favourite books

"/favobook/delete": DELETE.  
Body: {user, bookID[...]}, (user: user's email)

## Get read book of the user

"/readbook": POST
Body: {user}

## Add read book

"/readbook/add": POST
Body: {user, bookID[...]}

## Delete read book

"/readbook/delete": DELETE
Body: {user, bookID[...]}

## Get club list

"/club": GET.
Params: page number: /club/:p

## Create a club

"/club/create": POST.  
Body: { host, title, status, members[...], bookList[...]}, (host: user's email)

## Add member to club

"/club/addmember": POST.  
Body: { club, member }, (club: club title. member: user's email)

## Delete member from club

"/club/delmember": DELETE.
Body: { club, user, members[...]}, (club: club name, user: host email, members: email array)

## Add books to club book list

"/club/addbooks": POST.
Body: {club,user, bookID[...]}

## Delete books from club book list

"/club/dlebooks": DELETE.
Body: {club,user, bookID[...]}

## Upload files

"/upload": POST.

## Get book reviews

"/review/:id" GET.
Params: bookID

## Add book review

"/review/add" POST.
Body: {bookID, user, review, rating}

## Update book review

"/review/update" POST
Body: {bookID, user, reviewID, review, rating}

## Delete book review

"/review/delete" POST
Body: {bookID, user, reviewID }
