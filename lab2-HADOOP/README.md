## Lab2 - Hadoop

### URLs
Namenode `http://localhost:50070/`  
Datanode `http://localhost:50075/`  
Hadoop   `http://localhost:8088/`  

### Commands
Start DFS  
`start-dfs.sh`  
Stop DFS  
`stop-dfs.sh`  
  
Mkdir on Hadoop  
`hadoop fs -mkdir /lab2`  
Upload to Hadoop  
`hadoop fs -copyFromLocal ./lab2/request.log /lab2/request.log`  
  
Run program  
`hadoop jar Counter.jar UrlCount /lab2/request.log /lab2/out1`  


