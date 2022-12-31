start geth ^
--datadir data ^
--networkid 1111 ^
--http ^
--http.addr 0.0.0.0 ^
--http.api admin,eth,debug,miner,net,txpool,personal,web3 ^
--http.corsdomain * ^
--http.vhosts=* ^
--allow-insecure-unlock ^
--http.port 8545