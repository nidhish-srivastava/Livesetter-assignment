from flask import Blueprint, Response
import cv2

videostream = Blueprint("livestream", __name__, url_prefix="/api/video")

@videostream.get('/')
def video():
    # Replace 'rtsp://your-rtsp-url' with your RTSP stream URL
    rtsp_url = 'rtsp://zephyr.rtsp.stream/pattern?streamKey=5afcf6a250d6704c3acb5fa05505ed8d'

    def generate_frames():
        cap = cv2.VideoCapture(rtsp_url)
        while True:
            success, frame = cap.read()
            if not success:
                break
            ret, buffer = cv2.imencode('.jpg', frame)
            if not ret:
                continue
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')

    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')