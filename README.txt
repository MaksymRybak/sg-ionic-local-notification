ionic start sg-ionic-local-notification blank --type=angular --capacitor  
ionic build  
npx cap add android  
npx cap add ios  


ionic cap run android -l --external  
