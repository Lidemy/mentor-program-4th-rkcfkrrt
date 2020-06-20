#!/bin/bash
n=$1
for ((i=1; i<=n; i++))
do
	touch "$i.js";
done
echo "檔案建立完成" 