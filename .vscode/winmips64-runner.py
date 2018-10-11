import os, sys

# check parameters
try:
    winmips_path = sys.argv[1]
    file_path = sys.argv[2]
except KeyError:
    exit(-1)

# change current path
os.chdir(winmips_path)

# write las file
las_file = open("winmips64.las", "w")
las_file.write(file_path)
las_file.close()

# run winmips64
print("=> Running {}".format(file_path))
os.system("winmips64.exe")