# Set the base images version to node 14.18.2 (LTS)
FROM node:14.18.2 

#ENV NODE_ENV=uat

WORKDIR /app
# Above we set the build environment as a folder called /app in the docker container to prevent clashes

COPY package*.json /app/


# To prevent repeated npm installs anytime we make any change, we'd copy over the package.json and install things first

RUN npm install
# Install dependencies

#RUN npm run build

COPY ./ /app/
# Copy the rest of the project over to the /app folder in the container
ADD  buggodie-env /app/
# The server listens at PORT 8000
EXPOSE 8000

CMD [ "npm", "run", "dev" ]