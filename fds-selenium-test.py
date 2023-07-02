from selenium import webdriver
from selenium.webdriver.common.by import By


driver = webdriver.Chrome()

driver.get("http://localhost:3000/")
#driver.get("http://fdsapp.s3-website.ap-south-1.amazonaws.com")

title = driver.title
assert title == "FDS Web App"

driver.implicitly_wait(0.5)

print("=================================================")
print("== Functional Testing Starts (Selenium)        ==")
print("=================================================")
print("")

text_box = driver.find_element(by=By.NAME, value="search")
value = text_box.text
assert value == ""
print ('PASSED   Test 01: Check if website site is up.')
driver.implicitly_wait(1)

station_radio = driver.find_element(by=By.ID, value="radioStation")
station_radio.click()

driver.implicitly_wait(3)


returned_elements = driver.find_elements(By.CLASS_NAME,"table-row")
found = "false"
for i in returned_elements:
    if i.text.__contains__("Surat"):
        found = "true"

if found == "true":
    print ('PASSED   Test 02: Check if backend returning value.')
else:
    print ('FAILED   Test 02: Check if backend returning value.')


submit_button = driver.find_element(by=By.ID, value="srchBtn")
text_box.send_keys("KOTA")
print ('PASSED   Test 03: Able to interact with website.')

driver.implicitly_wait(3)

submit_button.click()

returned_elements = driver.find_elements(By.CLASS_NAME,"table-row")
found = "false"
for i in returned_elements:
    if i.text.__contains__("Ratlam"):
        found = "true"

if found == "false":
    print ('PASSED   Test 04: Check if site is functional.')
else:
    print ('FAILED   Test 04: Check if site is functional.')

driver.implicitly_wait(2)

print("")
print("=================================================")
print("== Testing Ends                                ==")
print("=================================================")
print("")

driver.quit()
