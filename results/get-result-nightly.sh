#!/bin/bash

RUN_NN="$1"
LINK=https://docs.neon-labs.org/neon-compatibility/"$RUN_NN"/data/suites.csv
curl "$LINK" -o nightly-"$RUN_NN".source.txt

cat nightly-"$RUN_NN".source.txt |
  tr [:punct:] ' ' |
  sed 's/  / /g' |
  sed 's/  / /g' |
  sed 's/  / /g' |
  sed 's/  / /g' |
  sed 's/  / /g' |
  cut -d" " -f2,20-40 |
  sort -t" " -k2,8 |
  cat > nightly-"$RUN_NN".txt

ls -al nightly-"$RUN_NN".source.txt
rm nightly-"$RUN_NN".source.txt
rm nightly-"$RUN_NN".source.txt | echo ok

echo "$LINK" > nightly.txt
cat nightly-"$RUN_NN".txt >> nightly.txt
