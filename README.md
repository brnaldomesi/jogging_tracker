1. run into python virtual env
C:\Users\messi\Documents> pymote_env\Scripts\activate
2. change your directory to backend
3. Install required libraries
jogging\backed\jogging_tracker>pip install -r requirements.txt
4. Run backedn server
jogging\backed\jogging_tracker>.\manage.py runserver

5. Run into python console
jogging\backed\jogging_tracker>manage.py shell
(you can use your python code here.)
>>> from user.models import User
>>> u = User.objects.get(email='admin@example.com')
>>> u.set_password('testtest')
>>> u.save()
>>> exit()

6. CORS permission
jogging\backed\jogging_tracker\jogging_tracker\settings.py
CORS_ORIGIN_WHITELIST = (
    'google.com',
    'localhost:3000',
    'localhost:3001',
    'localhost:8000',
    '127.0.0.1:9000'
)



Frontend
jogging\frontend\jogging_tracker

1. npm install
2. npm start
3. Create .env file

API_ROOT=http://localhost:8000
REACT_APP_API_ROOT=http://localhost:8000

4. IF step 3 fails
jogging\frontend\jogging_tracker\src\rediux\api\apiCall.js

axios.defaults.baseURL = 'http://localhost:8000/'

*
jogging\backed\jogging_tracker\user\models.py
line 69: USERNAME_FIELD = 'email'

ID:admin@example.com
PWD:testtest