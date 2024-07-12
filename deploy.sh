echo "Building app..."
npm run build
echo "Deploy files to server..."
scp -r  dist/* root@178.128.96.22:/var/www/html/
echo "Done!"