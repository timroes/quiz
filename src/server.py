#! /usr/bin/env python2/
import os
import json
from SimpleHTTPServer import SimpleHTTPRequestHandler
import BaseHTTPServer

PORT = 4242

class QuizHTTPHandler(SimpleHTTPRequestHandler):
  # def __init__(self):
  #   SimpleHTTPRequestHandler.__init__(self)
  def do_GET(self):
    """
      If the user requested the quizzes/list.json file return an array of all quiz directory names,
      otherwise just pass the call to the parent class, to do a regular request.
    """
    if self.path == "/quizzes/list.json":
      quizzes = [q for q in os.listdir('quizzes/') \
        if os.path.isdir('quizzes/' + q) and os.path.isfile('quizzes/' + q + '/quiz.json')]
      self.send_json(quizzes)
      pass
    else:
      SimpleHTTPRequestHandler.do_GET(self)

  def log_message(self, format, *args):
    # Ignore all log messages and don't polute the shell
    pass

  def send_json(self, obj):
    """Send out an object serialized as JSON to the client."""
    self.send_response(200)
    self.send_header('Content-Type', 'application/json')
    self.end_headers()
    self.wfile.write(json.dumps(obj))


if __name__ == "__main__":
  # Jump to the directory this script is in
  root = os.path.dirname(os.path.realpath(__file__))
  os.chdir(root)
  # Start a HTTP server with the QuizHTTPHandler class
  server = BaseHTTPServer.HTTPServer(("", PORT), QuizHTTPHandler)
  try:
    print("Starting server on http://localhost:%s. Open this URL in your browser." % (PORT))
    server.serve_forever()
  except KeyboardInterrupt:
    server.server_close()

  print("Shutting down server.")
