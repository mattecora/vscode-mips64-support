import os, sys

# check parameters
try:
    winmips_path = sys.argv[1]
    file_path = sys.argv[2]
except KeyError:
    exit(-1)

# change current path
os.chdir(winmips_path)

# run asm
if os.system("asm.exe \"{}\"".format(file_path)) == 0:
    print("\n=> Program correctly assembled!")

    # delete temporary files
    os.remove("{}\\{}.cod".format(os.path.dirname(file_path), os.path.basename(file_path).split(".")[0]))
    os.remove("{}\\{}.dat".format(os.path.dirname(file_path), os.path.basename(file_path).split(".")[0]))