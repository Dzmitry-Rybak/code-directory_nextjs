FROM nginx:1.15-alpine

# Remove any existing config files
RUN rm /etc/nginx/conf.d/* 

COPY ./nginx.conf /etc/nginx/

# Expose the listening port
EXPOSE 80

# for test!
# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]