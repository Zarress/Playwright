This is my first Playwright experience.

Important notes:
- tests are created for my React app
- tests cover most functionalities, but they don't cover everything and don't go too deep
- most of the tests are not properly isolated (in real app isolation can be achieved with API calls, which my project doesn't have)
- page reloadings check if data is not lost after it - my app uses only local storage to save data (it's easy way to test, but probably there is better method for asserting if data is stored properly in local storage)
