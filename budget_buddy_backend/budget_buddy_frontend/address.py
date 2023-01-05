# import required module
import os

def chooseAddress():
    option = '0'

    while option != '1' and option != '2':
        option = input('1) Server\n2) Local\nEnter option: ')

    return option

def changeAddress(addr, change):
    listFiles('src/components', addr, change)
    listFiles('src/pages', addr, change)

def listFiles(path, addr, change):
    # iterate over files in
    # that directory
    for filename in os.listdir(path):
        f = os.path.join(path, filename)
        # checking if it is a file
        if os.path.isfile(f):
            with open(f,'r',encoding='utf-8') as file:
                data = file.readlines()

            for i in range(len(data)):
                if change in data[i]:
                    data[i] = data[i].replace(change, addr)
                    # print(data[i])

            with open(f, 'w', encoding='utf-8') as file:
                file.writelines(data)

option = chooseAddress()
    
match option:
    case '1':
        changeAddress('https://saber.andrewarteaga.com:8000', 'http://127.0.0.1:8000')
    case '2':
        changeAddress('http://127.0.0.1:8000', 'https://saber.andrewarteaga.com:8000')
