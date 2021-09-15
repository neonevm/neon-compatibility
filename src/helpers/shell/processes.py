import os


def run_command_line(command: str):
    print("============ running command... ============")
    print(command)
    stream = os.popen(command)
    output = stream.read()
    return output
