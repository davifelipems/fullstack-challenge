package main

import (
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"

	"github.com/gorilla/mux"
)

func proxyOmdbAPI(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	urlString := "http://www.omdbapi.com/?apikey=d3292bff"

	//possíveis parâmetros:
	//(s - busca vários registros pelo título)
	//(t - um registro pelo título)
	//(i - busca pelo id)
	parametros := []string{"s", "t", "i", "page"}

	for _, param := range parametros {

		if r.FormValue(param) != "" {
			urlString += "&" + param + "=" + url.QueryEscape(r.FormValue(param))
		}
	}

	resp, err := http.Get(urlString)
	if err != nil {
		log.Fatalln(err)
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)

	if err != nil {
		log.Fatalln(err)
	}

	io.WriteString(w, string(body))

}

func main() {

	//init router
	r := mux.NewRouter()

	// Route handles & endpoints
	r.HandleFunc("/itens", proxyOmdbAPI).Methods("GET")

	// Start server
	log.Fatal(http.ListenAndServe(":8000", r))
}
