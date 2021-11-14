cd src;
if [ -d "dist" ]; then
  echo "found dist directory, deleting and recompiling, starting server..."
  rm -rf dist;
  npm run tsc;
  npm run start
elif ! [ -d "dist" ]; then
  echo "no dist folder detected, compiling typescript, and then starting server"
  npm run tsc;
  echo $SVDIR
  npm run start
fi