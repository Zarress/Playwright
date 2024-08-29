**This is my first experience with Playwright.**

**Important notes:**
- The tests are created for my React app.
- The tests cover most functionalities, but they don't cover everything and don't go too deep.
- Most of the tests are not properly isolated (in a real app, isolation can be achieved with API calls, which my project doesn't have).
- Page reloads check if data is not lost afterward – my app only uses local storage to save data (this is an easy way to test, but there is probably a better method for asserting if data is stored properly in local storage).