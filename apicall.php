<?php
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://int-api.mx.com/users/USR-e3e6bfbf-c16e-419f-be47-d66dd274cc81/accounts',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'GET',
  CURLOPT_HTTPHEADER => array(
    'Accept: application/vnd.mx.api.v1+json',
    'Authorization: Basic NDdiZmQzNTAtMmEzZi00NGVhLWE3YzAtM2IyNzliMmQ3MGQ2OmZkMTk0Zjg0NzM3OTRlMGVmMWY1ZTQxYWQ1MmZkOTViM2E5YzgzZmM='
  ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;
  
?>