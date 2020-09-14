npm run build:h5 -- --mode=docker #&& npm run build:app-plus -- --mode=docker
docker build -t lost-found-h5:0.0.1 .
docker tag lost-found-h5:0.0.1 harbor.supwisdom.com/service-governance/lost-found-h5:0.0.1
docker push harbor.supwisdom.com/service-governance/lost-found-h5:0.0.1
