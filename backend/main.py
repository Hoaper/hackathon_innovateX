import cv2
import dlib
import numpy as np
import os
from time import sleep

# Инициализация детектора лиц и ключевых точек
face_detector = dlib.get_frontal_face_detector()
landmark_predictor = dlib.shape_predictor(r"C:\Users\zh0per\Desktop\hackathon\backend\models\shape_predictor_68_face_landmarks.dat") # Загрузите свой файл с ключевыми точками

# Захват видеопотока с камеры (0 - индекс камеры)
cap = cv2.VideoCapture(0)

mini_db = {
    "2.png": {
        "answer1": "Мадара Учиха",
        "answer2": "Итачи Учиха",
        "correct": "Мадара Учиха",
    },
    "3.png": {
        "answer1": "Рёмен Сукуна",
        "answer2": "Мадара Учиха",
        "correct": "Рёмен Сукуна"
    }, 
    "4.png": {
        "answer1": "Итачи Учиха",
        "answer2": "Рамен Сукуна",
        "correct": "Итачи Учиха",
    }
}

# Список для хранения вертикальных координат верхних частей левого и правого глаза
eye_heights_left = []
eye_heights_right = []

PHOTOS_PATH = os.path.join(os.path.abspath(os.getcwd()), "guess_photos")

def start_game():
    photos = os.listdir(PHOTOS_PATH)
    i = 0
    SCORE = 0
    ALL = len(photos)
    wait = 50
    choose = None
    while True:
        answer1 = mini_db[photos[i]]["answer1"]
        answer2 = mini_db[photos[i]]["answer2"]
        question = "Угадайте имя персонажа!"

        current_photo_path = os.path.join(PHOTOS_PATH, photos[i])
        photo_guess = cv2.imread(current_photo_path)
        
        photo_guess = cv2.resize(photo_guess, (150, 200))

        if wait != 0 and choose != None:
            wait -= 1
            ret, frame = cap.read()
            frame = cv2.flip(frame, 1)

            photo_height, photo_width, _ = photo_guess.shape
            frame_height, frame_width, _ = frame.shape
            
            # Calculate the coordinates to place the photo in the center
            x = (frame_width - photo_width) // 2
            y = (frame_height - photo_height) // 2 - 100
            
            # Put the photo into the frame at the calculated coordinates
            frame[y:y+photo_height, x:x+photo_width] = photo_guess
            
            cv2.putText(frame, question, (200, 20), cv2.FONT_HERSHEY_COMPLEX, 0.5, text_color, 2)
            cv2.putText(frame, answer1, (10, 100), cv2.FONT_HERSHEY_COMPLEX, 0.5, text_color, 2)
            cv2.putText(frame, answer2, (500, 100), cv2.FONT_HERSHEY_COMPLEX, 0.5, text_color, 2)

            cv2.imshow("Head Tilt Detection", frame)
            if cv2.waitKey(1) & 0xFF == ord('q') or i >= ALL:
                break
            continue
        elif wait == 0:
            wait = 50
            choose = None
            text_color = (255, 255, 255)
            eye_heights_left.clear()
            eye_heights_right.clear()
            i += 1


        ret, frame = cap.read()
        frame = cv2.flip(frame, 1)
        if not ret:
            break

        # Переводим изображение в оттенки серого (по желанию)
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        
        # Детектируем лицо
        faces = face_detector(gray)
        for face in faces:
            # Находим ключевые точки лица
            landmarks = landmark_predictor(gray, face)
            
            # Находим вертикальные координаты верхних частей левого и правого глаза
            left_eye_top = landmarks.part(37).y  # Верхняя часть левого глаза (индексы 37-38)
            right_eye_top = landmarks.part(43).y  # Верхняя часть правого глаза (индексы 43-44)
            
            # Добавляем координаты в список
            eye_heights_left.append(left_eye_top)
            eye_heights_right.append(right_eye_top)
        
        # Отображаем вопрос и варианты ответа на кадре
        
        photo_height, photo_width, _ = photo_guess.shape
        frame_height, frame_width, _ = frame.shape
        
        # Calculate the coordinates to place the photo in the center
        x = (frame_width - photo_width) // 2
        y = (frame_height - photo_height) // 2 - 100
        
        # Put the photo into the frame at the calculated coordinates
        frame[y:y+photo_height, x:x+photo_width] = photo_guess


        if len(eye_heights_left) > 10:
            avg_left = np.mean(eye_heights_left[-10:])
            avg_right = np.mean(eye_heights_right[-10:])
            vertical_diff = avg_left - avg_right
            
            if vertical_diff > 10:
                choose = answer1
                text_color = (0, 255, 0)  # Зеленый цвет для наклона влево
            elif vertical_diff < -10:
                choose = answer2
                text_color = (0, 0, 255)  # Красный цвет для наклона вправо
            else:
                choose = None
                text_color = (255, 255, 255)  # Белый цвет для прямой головы
        else:
            text_color = (255, 255, 255)  # Белый цвет по умолчанию
        
        cv2.putText(frame, question, (200, 20), cv2.FONT_HERSHEY_COMPLEX, 0.5, text_color, 2)
        cv2.putText(frame, answer1, (10, 100), cv2.FONT_HERSHEY_COMPLEX, 0.5, text_color, 2)
        cv2.putText(frame, answer2, (500, 100), cv2.FONT_HERSHEY_COMPLEX, 0.5, text_color, 2)

        if choose != None:
            if choose == mini_db[photos[i]]["correct"]:
                SCORE += 1


        cv2.imshow("Head Tilt Detection", frame)
        if cv2.waitKey(1) & 0xFF == ord('q') or i >= ALL:
            break

    print(f"{SCORE}/{ALL}") 

def destroy():      
    cap.release()
    cv2.destroyAllWindows()


start_game()
destroy()