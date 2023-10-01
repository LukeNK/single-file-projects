import pyautogui
import time
import random

pyautogui.hotkey('win', '1')

x = 1
while x < 100:
    time.sleep(1);
    pyautogui.hotkey('ctrl', str(x % 2 + 1))
    pyautogui.write(str(x), interval = random.randint(0, 15) / 10)
    pyautogui.press('enter');
    x += 1;

