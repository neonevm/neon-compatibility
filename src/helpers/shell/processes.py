import os


def run_command_line(command: str):
    stream = os.popen(command)
    output = stream.read()
    return output
