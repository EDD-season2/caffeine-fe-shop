FROM nginx

RUN ls -al
WORKDIR /usr/src/app/public 

COPY . /usr/src/app/public