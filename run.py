import base64
import requests
import json
request = {
    "method": "POST",
    "url": "https://ai.repl.page/api/prompt",
    "body": {
    }
}
data = base64.b64encode(json.dumps(request).encode('utf-8')).decode('utf-8')
data = data.replace('+', '%2B').replace('/', '%2F').replace('=', '%3D')
url = "http://localhost:3020/send/" + data
requests.get(url)
