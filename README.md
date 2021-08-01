# Update your Cloudflare DNS records automagically
> Now with support for comments for each record!

This repo is the tool that enables the magic. If you want to just use it right now, head over to the [template repo](https://github.com/pvinis/mydomain.com-cloudflare-dns-records) and click on the `Use this template` button.

## Use right now by going to the [template repo](https://github.com/pvinis/mydomain.com-cloudflare-dns-records) and click on the `Use this template` button.

## How does this work?
### Example usage (that's what the templare repo does)

```yml
uses: pvinis/update-cloudflare-dns@v1.0
with:
  zone: mydomain.com
```


## Some context on DNS record formatting

There is a typical formatting for DNS records. Here are some examples:
- `wow.mydomain.com.	1	IN	A	11.22.33.44`.
- `sub.mydomain.com.	600	IN	TXT	"some-key-verification=value ?huh -thats cool!"`
- `mail.mydomain.com.	1	IN	MX	20 some.email.com.`

There are 5 parts, separated by tabs.

The first part is the name of the record. The `mail.mydomain.com.` part is the full version. We only care about everything before `.mydomain.com.`.
So if we want to assign a record to `mail.mydomain.com.`, we would use `name: mail`.
If we want to use the base url `mydomain.com.`, we can use `name: @` as a shorthand.

The second part is called TTL (time-to-live). This is how long (in seconds) the record will be cached for.
`1` is a special value and for Cloudflare this is mapped to `Auto`. Usually that goes hand in hand with a record being proxied.
In the second part we have used `600` as the TTL, which means that every 10 minutes the record will be refreshed.

The third part is the record class. `IN` is assigned for the class of `Internet`. That's where we are, so we don't need to change that.

The fourth part is the record type. In our examples above, we see `A`, `TXT`, and `MX`. The following types are available: `A`, `AAAA`, `CNAME`, `HTTPS`, `TXT`, `SRV`, `LOC`, `MX`, `NS`, `SPF`, `CERT`, `DNSKEY`, `DS`, `NAPTR`, `SMIMEA`, `SSHFP`, `SVCB`, `TLSA`, `URI read only`.
You can read more about these online.

The fifth and last part is the content of the record. It differs for each record type, and in some cases it can be a couple more parts than just one, separated by spaces this time.
For example, in `A` records, the content is the IPv4 address. In `AAAA` records, the content is the IPv6 address. In `MX` records, the content is the priority and the mail server. In `TXT` records, the content is the actual text value we want the record to have.


## Examples
- Main structure of your config file `DNS-RECORDS.hjson`

We use [hjson](https://hjson.org/) as the configuration file format.
```hjson
{
	records: [
		# Any comments you want, can be added with a leading `#`.
		{
			type: A
			name: mail
			ipv4: 11.22.33.44
		}

    # Other records too
  ]
}
```

- `A` record
```hjson
{
	type: A
	name: wow
	ipv4: 11.22.33.44
  # ttl: 7200 (default: 1)
  # proxied: false (default: true)
}
```

- `AAAA` record
```hjson
{
	type: AAAA
	name: @
	ipv6: 684D:1111:222:3333:4444:5555:6:77
  # ttl: 7200 (default: 1)
  # proxied: false (default: true)
}
```

- `CNAME` record
- `HTTPS` record

- `TXT` record
```hjson
{
	type: TXT
	name: sub
	content: some-key-verification=value ?huh -thats cool!
  # ttl: 7200 (default: 1)
  # proxied: false (default: true)
}
```


👋 If you use and like this, consider sending me a few bucks in appreciation.

<script type="text/javascript" src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js" data-name="bmc-button" data-slug="pvinis" data-color="#BD5FFF" data-emoji="🍕"  data-font="Poppins" data-text="Buy me a pizza" data-outline-color="#000000" data-font-color="#ffffff" data-coffee-color="#FFDD00" ></script>
