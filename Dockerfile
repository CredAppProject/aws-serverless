FROM amazonlinux:2018.03

WORKDIR /app
COPY . /app

RUN yum install https://rpm.nodesource.com/pub_18.x/nodistro/repo/nodesource-release-nodistro-1.noarch.rpm -y
RUN yum install nodejs -y --setopt=nodesource-nodejs.module_hotfixes=1
RUN npm install

CMD ["npm", "start"]
