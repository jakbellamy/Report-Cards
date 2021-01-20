from selenium import webdriver
from time import sleep
from selenium.webdriver.chrome.options import Options
options = Options()
options.add_argument('--headless')

browser = webdriver.Chrome('./chromedriver')

browser.get('http://localhost:3000/bhg')
sleep(3)
browser.close()
