import pyautogui
import time
from random import randint

pyautogui.hotkey('win', '1')

x = 1
while x < 100:
    time.sleep(randint(5, 20) / 10);
    pyautogui.hotkey('ctrl', str(x % 2 + 1))
    pyautogui.write(str(x), interval = randint(0, 15) / 10)
    pyautogui.press('enter');
    x += 1;
