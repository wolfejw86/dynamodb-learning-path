# requires aws-cli to be setup correctly and an aws account

aws cloudformation create-stack --stack-name GenericAppName  --template-body file://./single-table-cloudformation.json