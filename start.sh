cd src;
if [ -d "dist" ]; then
  echo "found dist directory, starting server..."
  npm run start
elif ! [ -d "dist" ]; then
  echo "no dist folder detected, compiling typescript, and then starting server"
  npm run tsc;
  echo $SVDIR
  npm run start
fi