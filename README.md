#Elm React Adaptor#

* Inspired by https://github.com/evancz/react-elm-components *

This allows you to sneak some Elm into your existing React projects with very little pain

##Example ##

Your React component
```
import React from "react"

import Elmo from "elm-react-adaptor"
import { ElmComponent } from "./Component.elm"

export default class Example extends React.Component {

	state = {
		color: "blue",
		label: "ELM"
	}

	render() {
		return (
			<div>
				<Elmo
					options={this.state}
					src={ElmComponent}
					sends={[
						{
							portName: "info",
							payload: {
								color: this.state.color,
								label: this.state.label
							},
						},
					]}
					/>
			</div>
}
```

Your Elm
```
port module ElmComponent exposing (..)

import Html exposing (Html, div, text)
import Html.Attributes exposing( style )

port toJs : String -> Cmd msg
port info : (Model -> msg) -> Sub msg

-- MODEL --

type alias Model =
	{
		color: String
		, label: String
	}

-- UPDATE --

type Msg
	= NewInfo Model
	| NoOp

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
	case msg of
		NewInfo portInfo->
			( portInfo, Cmd.none )
		NoOp ->
			( model, Cmd.none )

-- SUBSCRIPTIONS --

subscriptions : Model -> Sub Msg
subscriptions model = 
	info NewInfo

-- INITIAL --

initialModel : Model
initialModel =
	{
		color = "white"
		, label = ""
	}

-- INIT --

init : ( Model, Cmd Msg )
init = 
	( initialModel, Cmd.none )

-- VIEW --

view : Model -> Html Msg
view model =
	div[ style [("backgroundcolor", model.color)]][text model.label]

-- MAIN --

main: Program Never Model Msg
main =
	program
		{ init = init
		, view = view
		, update = update
		, subscriptions = subscriptions
		}
```
