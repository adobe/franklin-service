select top 1 req_url from @table, count(req_url) 
    where req_http_Referer like "%@state%" group by req_url
    order by count(req_url)