# echoserver

Server base Url	"http://echoserver-env.eba-bccqr6dt.us-east-1.elasticbeanstalk.com"

# Route	Method	Description	body/params

"/":	GET.	Server test.	

"/register":	POST.	Register new user. Body:	{ email, username, password, country, state" }

"/update":	PUT. Update user info.	Body: { email, username, password, country, state}

"/auth":	POST.	Authentication. Body:	{ email, password }
			
"/books/:p":	GET.	Get books by page, 500 for each page. Params: pagenumber

"/books/id/:id"	GET.	Get single book by book ID.	Params: bookID
			
"/favobook":	POST.	Get favourite book list of the user. Body	{user},(user: user's email)

"/favobook/add":	POST.	Add favourite book list.	Body: {user, bookID[...]}, (user: user's email)

"/favobook/delete":	DELETE.	Delete favourite books. Body:	{user, bookID[...]}, (user: user's email)
			
"/club/create":	POST.	Create a club. Body:	{ host, title, status, members[...], bookList[...]}, (host: user's email)

"/club/addmember":	POST.	Add member to club. Body:	{ club, member }, (club: club title. member: user's email)
