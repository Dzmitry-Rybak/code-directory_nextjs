FROM nginx:1.15-alpine

# Remove any existing config files
RUN rm /etc/nginx/conf.d/* 

# Copy config files
# *.conf files in "conf.d/" dir get included in main config
# COPY ./my-nginx.conf /etc/nginx/conf.d/
# COPY ./default.conf /etc/nginx/conf.d/
COPY ./nginx.conf /etc/nginx/
# COPY ./mime.types /etc/nginx/
# COPY ./convert-nginx.sh /etc/nginx/

# giving execution permissions to convert-nginx.sh shell file. 
# RUN chmod +x /etc/nginx/convert-nginx.sh

# Expose the listening port
EXPOSE 8080

# Commented this because, we want COMMAND full control in docker-compose and deployment.yml files only.
# CMD [ "/bin/sh","-c","/etc/nginx/convert-nginx.sh"] 