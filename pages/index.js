import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Paper, Grid, Select, Button, Card, ButtonBase } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function App() {
	const [color, setColor] = useState("#b32aa9");
	const [name, setName] = React.useState("");

	const handleChangeInputText = (event) => {
		setName(event.target.value);
	};
	const [colourCombination, setColourCombination] =
		React.useState("complementary");

	const handleChangeInputDropDown = (event) => {
		setColourCombination(event.target.value);
	};

	var Harmonizer = require("color-harmony").Harmonizer;
	var harmonizer = new Harmonizer();
	harmonizer.add("anal-og", [-30, 0, 30, 60, 90]);

	var colourHarmonizerOutput = harmonizer.harmonize(color, colourCombination);
	console.log(colourHarmonizerOutput);

	const reactElementsArray = colourHarmonizerOutput.map((data) => {
		return (
			<Grid item xs={8}>
				<div alignItems="center" style={{ marginBottom: 50, marginLeft: 100 }}>
					<Card style={{ backgroundColor: `${data}`, height: 100 }}></Card>

					<Paper
						alignItems="center"
						style={{ textAlign: "center" }}
						onClick={() => {
							navigator.clipboard.writeText(data);
						}}
					>
						{" "}
						<ButtonBase fullWidth>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									flexWrap: "wrap",
								}}
								fullWidth
							>
								<ContentCopyIcon />
								<h3 alignItems="center" style={{ textAlign: "center" }}>
									{data}
								</h3>
							</div>
						</ButtonBase>
					</Paper>

					{/* <Button
						variant="outlined"
						startIcon={<ContentCopyIcon />}
						onClick={() => {
							navigator.clipboard.writeText(data);
						}}
						alignItems="center"
					>
						Copy hex color code
					</Button> */}
				</div>
			</Grid>
		);
	});

	const reactComponent = (props) => {
		return <Box>{reactElementsArray}</Box>;
	};

	return (
		<Grid
			container
			spacing={0}
			direction="row"
			alignItems="center"
			justifyContent="center"
			style={{ minHeight: "100vh" }}
		>
			<Grid item xs={3} alignItems="center" justifyContent="center">
				<Card
					style={{
						padding: 10,
					}}
				>
					<Grid
						container
						spacing={0}
						direction="column"
						alignItems="center"
						justifyContent="center"
					>
						{" "}
						<div
							className="value"
							style={{
								borderLeftColor: color,
								borderLeft: "24px solid #000",
								paddingLeft: "10px",
								marginTop: "20px",
							}}
						>
							Current color is {color}
						</div>
						<div className="App">
							<HexColorPicker
								color={color}
								onChange={(setColor, setName)}
								style={{
									marginTop: 50,
									width: 300,
									height: 300,
								}}
							/>

							{/* <div className="buttons">
							<button onClick={() => setColor("#c6ad23")}>Choose gold</button>
							<button onClick={() => setColor("#556b2f")}>Choose green</button>
							<button onClick={() => setColor("#207bd7")}>Choose blue</button>
						</div> */}

							<FormControl style={{ marginTop: 50 }} fullWidth>
								<InputLabel htmlFor="component-outlined">Hex Code</InputLabel>
								<OutlinedInput
									id="component-outlined"
									placeholder="Please enter text"
									label="Hex Code"
									value={name}
									onChange={handleChangeInputText}
								/>
							</FormControl>
							<Button
								style={{ marginTop: 50 }}
								variant="contained"
								onClick={() => setColor(name)}
							>
								Enter Custom Colour
							</Button>

							<FormControl
								fullWidth
								style={{ marginTop: 50, marginBottom: 50 }}
							>
								<InputLabel id="demo-simple-select-label">
									Color combination
								</InputLabel>
								<Select
									value={colourCombination}
									label="Colour Combination"
									onChange={handleChangeInputDropDown}
								>
									<MenuItem value={"complementary"}>Complementary</MenuItem>
									<MenuItem value={"triadic"}>Triadic</MenuItem>
									<MenuItem value={"tetradic"}>Tetradic</MenuItem>
									<MenuItem value={"anal-og"}>Analogous</MenuItem>
								</Select>
							</FormControl>
						</div>
					</Grid>
				</Card>
			</Grid>{" "}
			<Grid item xs={3} alignItems="center" justifyContent="center">
				{reactComponent(reactElementsArray)}
			</Grid>
		</Grid>
	);
}
