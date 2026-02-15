"use client";

import { useState, useMemo } from "react";

interface StatusCode {
  code: number;
  name: string;
  description: string;
  category: string;
}

const STATUS_CODES: StatusCode[] = [
  // 1xx Informational
  { code: 100, name: "Continue", description: "The server has received the request headers and the client should proceed to send the request body.", category: "1xx Informational" },
  { code: 101, name: "Switching Protocols", description: "The requester has asked the server to switch protocols and the server has agreed to do so.", category: "1xx Informational" },
  { code: 102, name: "Processing", description: "The server has received and is processing the request, but no response is available yet.", category: "1xx Informational" },
  { code: 103, name: "Early Hints", description: "Used to return some response headers before final HTTP message.", category: "1xx Informational" },
  // 2xx Success
  { code: 200, name: "OK", description: "The request has succeeded. The meaning depends on the HTTP method used.", category: "2xx Success" },
  { code: 201, name: "Created", description: "The request has been fulfilled and a new resource has been created.", category: "2xx Success" },
  { code: 202, name: "Accepted", description: "The request has been accepted for processing, but the processing has not been completed.", category: "2xx Success" },
  { code: 203, name: "Non-Authoritative Information", description: "The returned metadata is from a local or third-party copy, not the origin server.", category: "2xx Success" },
  { code: 204, name: "No Content", description: "The server has fulfilled the request but does not need to return a response body.", category: "2xx Success" },
  { code: 205, name: "Reset Content", description: "The server has fulfilled the request and the client should reset the document view.", category: "2xx Success" },
  { code: 206, name: "Partial Content", description: "The server is delivering only part of the resource due to a range header.", category: "2xx Success" },
  { code: 207, name: "Multi-Status", description: "A Multi-Status response conveys information about multiple resources.", category: "2xx Success" },
  { code: 208, name: "Already Reported", description: "Members of a DAV binding have already been enumerated.", category: "2xx Success" },
  // 3xx Redirection
  { code: 300, name: "Multiple Choices", description: "There are multiple options for the resource that the client may follow.", category: "3xx Redirection" },
  { code: 301, name: "Moved Permanently", description: "The resource has been permanently moved to a new URL.", category: "3xx Redirection" },
  { code: 302, name: "Found", description: "The resource resides temporarily under a different URL.", category: "3xx Redirection" },
  { code: 303, name: "See Other", description: "The response can be found under a different URL using a GET method.", category: "3xx Redirection" },
  { code: 304, name: "Not Modified", description: "The resource has not been modified since the last request.", category: "3xx Redirection" },
  { code: 307, name: "Temporary Redirect", description: "The resource resides temporarily under a different URL. Method must not change.", category: "3xx Redirection" },
  { code: 308, name: "Permanent Redirect", description: "The resource has been permanently moved. Method must not change.", category: "3xx Redirection" },
  // 4xx Client Error
  { code: 400, name: "Bad Request", description: "The server cannot process the request due to malformed syntax.", category: "4xx Client Error" },
  { code: 401, name: "Unauthorized", description: "Authentication is required and has failed or has not been provided.", category: "4xx Client Error" },
  { code: 402, name: "Payment Required", description: "Reserved for future use. Some APIs use this for rate limiting.", category: "4xx Client Error" },
  { code: 403, name: "Forbidden", description: "The server understood the request but refuses to authorize it.", category: "4xx Client Error" },
  { code: 404, name: "Not Found", description: "The requested resource could not be found on the server.", category: "4xx Client Error" },
  { code: 405, name: "Method Not Allowed", description: "The request method is not supported for the requested resource.", category: "4xx Client Error" },
  { code: 406, name: "Not Acceptable", description: "The resource is not available in a format that the client accepts.", category: "4xx Client Error" },
  { code: 407, name: "Proxy Authentication Required", description: "The client must first authenticate itself with the proxy.", category: "4xx Client Error" },
  { code: 408, name: "Request Timeout", description: "The server timed out waiting for the request.", category: "4xx Client Error" },
  { code: 409, name: "Conflict", description: "The request could not be completed due to a conflict with the current state.", category: "4xx Client Error" },
  { code: 410, name: "Gone", description: "The resource is no longer available and no forwarding address is known.", category: "4xx Client Error" },
  { code: 411, name: "Length Required", description: "The request did not specify the length of its content.", category: "4xx Client Error" },
  { code: 412, name: "Precondition Failed", description: "A precondition in the request headers evaluated to false.", category: "4xx Client Error" },
  { code: 413, name: "Payload Too Large", description: "The request is larger than the server is willing to process.", category: "4xx Client Error" },
  { code: 414, name: "URI Too Long", description: "The URI provided was too long for the server to process.", category: "4xx Client Error" },
  { code: 415, name: "Unsupported Media Type", description: "The request entity has a media type the server does not support.", category: "4xx Client Error" },
  { code: 416, name: "Range Not Satisfiable", description: "The range specified in the Range header cannot be fulfilled.", category: "4xx Client Error" },
  { code: 418, name: "I'm a Teapot", description: "The server refuses to brew coffee because it is, permanently, a teapot.", category: "4xx Client Error" },
  { code: 422, name: "Unprocessable Entity", description: "The request was well-formed but unable to be processed.", category: "4xx Client Error" },
  { code: 429, name: "Too Many Requests", description: "The user has sent too many requests in a given amount of time.", category: "4xx Client Error" },
  { code: 451, name: "Unavailable For Legal Reasons", description: "The resource is unavailable due to legal demands.", category: "4xx Client Error" },
  // 5xx Server Error
  { code: 500, name: "Internal Server Error", description: "The server encountered an unexpected condition.", category: "5xx Server Error" },
  { code: 501, name: "Not Implemented", description: "The server does not support the functionality required to fulfill the request.", category: "5xx Server Error" },
  { code: 502, name: "Bad Gateway", description: "The server received an invalid response from the upstream server.", category: "5xx Server Error" },
  { code: 503, name: "Service Unavailable", description: "The server is currently unavailable (overloaded or down for maintenance).", category: "5xx Server Error" },
  { code: 504, name: "Gateway Timeout", description: "The server did not receive a timely response from the upstream server.", category: "5xx Server Error" },
  { code: 505, name: "HTTP Version Not Supported", description: "The server does not support the HTTP protocol version used in the request.", category: "5xx Server Error" },
  { code: 507, name: "Insufficient Storage", description: "The server is unable to store the representation needed to complete the request.", category: "5xx Server Error" },
  { code: 508, name: "Loop Detected", description: "The server detected an infinite loop while processing the request.", category: "5xx Server Error" },
  { code: 511, name: "Network Authentication Required", description: "The client needs to authenticate to gain network access.", category: "5xx Server Error" },
];

const CATEGORY_COLORS: Record<string, string> = {
  "1xx Informational": "text-blue-400",
  "2xx Success": "text-success",
  "3xx Redirection": "text-yellow-500",
  "4xx Client Error": "text-orange-500",
  "5xx Server Error": "text-error",
};

export default function HttpStatusCodes() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return STATUS_CODES;
    const q = search.toLowerCase();
    return STATUS_CODES.filter(
      (s) => s.code.toString().includes(q) || s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)
    );
  }, [search]);

  const grouped = useMemo(() => {
    const groups: Record<string, StatusCode[]> = {};
    for (const s of filtered) {
      if (!groups[s.category]) groups[s.category] = [];
      groups[s.category].push(s);
    }
    return groups;
  }, [filtered]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">HTTP Status Codes</h1>
        <p className="text-muted">Quick reference for all HTTP status codes with descriptions.</p>
      </div>

      <div className="mb-6">
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by code, name, or description..." className="w-full p-4 rounded-lg border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
      </div>

      <div className="space-y-6">
        {Object.entries(grouped).map(([category, codes]) => (
          <div key={category}>
            <h2 className={`text-lg font-bold mb-3 ${CATEGORY_COLORS[category] || ""}`}>{category}</h2>
            <div className="rounded-xl border border-border overflow-hidden">
              {codes.map((s, i) => (
                <div key={s.code} className={`flex gap-4 px-4 py-3 ${i > 0 ? "border-t border-border" : ""}`}>
                  <span className={`text-lg font-mono font-bold w-12 shrink-0 ${CATEGORY_COLORS[category] || ""}`}>{s.code}</span>
                  <div>
                    <div className="text-sm font-medium">{s.name}</div>
                    <div className="text-xs text-muted mt-0.5">{s.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-muted py-12">No status codes match your search.</div>
      )}
    </div>
  );
}
