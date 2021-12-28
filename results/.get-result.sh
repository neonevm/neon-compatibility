#!/bin/bash

STAND="$1"
RUN_NN="$2"
LINK=https://docs.neon-labs.org/neon-compatibility/"$STAND"/"$RUN_NN"/data/suites.csv
case $STAND in

  release)
    LINK=https://docs.neon-labs.org/neon-compatibility/teststand/"$RUN_NN"/data/suites.csv
    ;;

  "night")
    LINK=https://docs.neon-labs.org/neon-compatibility/"$RUN_NN"/data/suites.csv
    ;;
esac

echo "STAND=""$STAND"
echo "RUN_NN=""$RUN_NN"
echo "LINK=""$LINK"


curl "$LINK" -o "$STAND"-"$RUN_NN".source.txt

cat "$STAND"-"$RUN_NN".source.txt |
  tr [:punct:] ' ' |
  sed 's/  / /g' |
  sed 's/  / /g' |
  sed 's/  / /g' |
  sed 's/  / /g' |
  sed 's/  / /g' |
  cut -d" " -f2,20-40 |
  sort -t" " -k2,8 |
  cat > ./"$STAND"/"$STAND"-"$RUN_NN".txt

ls -al "$STAND"-"$RUN_NN".source.txt
rm "$STAND"-"$RUN_NN".source.txt

echo "$LINK" > "$STAND".txt
cat ./"$STAND"/"$STAND"-"$RUN_NN".txt >> "$STAND".txt
