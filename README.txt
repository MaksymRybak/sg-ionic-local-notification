ionic start sg-ionic-local-notification blank --type=angular --capacitor  
ionic build  
npx cap add android  
npx cap add ios  

ionic cap run android -l --external  

NOTE: after chaning icons/sounds make sync with your target project  
NOTE: to make notification sound works re-install your app??  