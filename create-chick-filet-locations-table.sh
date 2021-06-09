# requires aws-cli to be setup correctly and an aws account
aws cloudformation create-stack --stack-name Chick  --template-body file://./chick-filet-locations-table-cloudformation.json