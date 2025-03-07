import { Component, OnInit, ViewChild, inject } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";
import { BarChartOptions, DonutChartOptions, LineChartOptions, RadialBarChartOptions } from "src/app/constants/charts";
import { ThemeService } from "src/app/services/theme.service";
import { eCommerce } from "../../../constants/localStore";
@Component({
	selector: "app-ecommerce-dashboard",
	templateUrl: "./ecommerce-dashboard.component.html",
	styleUrls: ["./ecommerce-dashboard.component.scss"],
})
export class EcommerceDashboardComponent implements OnInit {
	@ViewChild("expenxe-chart") expenxeChart!: ChartComponent;
	public expenxeChartOptions!: Partial<RadialBarChartOptions>;

	@ViewChild("profit-chart") profitChart!: ChartComponent;
	public profitChartOptions!: Partial<LineChartOptions>;

	@ViewChild("generatedLeads") generatedLeads!: ChartComponent;
	public generateLeadsChartOptions!: Partial<DonutChartOptions>;

	@ViewChild("revenueReport") revenueReport!: ChartComponent;
	public revenueReportOptions!: Partial<BarChartOptions>;

	@ViewChild("BudgetChart") BudgetChart!: ChartComponent;
	public BudgetLineChartOptions!: Partial<LineChartOptions>;

	@ViewChild("BudgetChart") earningChart!: ChartComponent;
	public earningChartOptions!: Partial<BarChartOptions>;

	theme = inject(ThemeService);
	currentTheme!: string;
	totalValue: any;
	localData = eCommerce;
	listOfData = eCommerce.invoiceTable.tableData;

	constructor() {
		this.theme.pushTheme$.subscribe((res) => {
			this.currentTheme = res;
			this.expenceChartOptions();
			this.revenueReportOptionsF();
			this.BudgetChartOptionsF();
			this.earningChartOptionsF();
		});
	}

	ngOnInit(): void {
		this.profitChartOptionsI();
		this.generatedLeadsChartOptionsF();
		this.revenueReportOptionsF();
	}

	expenceChartOptions() {
		this.expenxeChartOptions = {
			series: [76],
			chart: {
				type: "radialBar",
				offsetY: -20,
				width: 148, // Set the width of the chart
				height: 170,
			},
			plotOptions: {
				radialBar: {
					startAngle: -90,
					endAngle: 90,
					hollow: {
						size: "60%",
					},
					track: {
						background: "#f2f2f2",
						strokeWidth: "40%",
						margin: 5,
					},
					dataLabels: {
						name: {
							show: false,
						},
						value: {
							offsetY: 0,
							fontSize: "16px",
							color: this.currentTheme === "dark" ? "#d0d4f1" : "#2f2b3d",
						},
					},
				},
			},
			fill: {
				colors: "#ff9f43",
				opacity: 1,
				type: "solid",
				pattern: {
					style: "verticalLines",
					height: 6,
					strokeWidth: 2,
				},
				// type: ;
			},
			labels: ["Average Results"],
		};
	}

	profitChartOptionsI() {
		this.profitChartOptions = {
			series: [
				{
					data: [10, 15, 25, 30, 45, 30],
				},
			],
			chart: {
				height: 70,
				width: 140,
				type: "line",
				zoom: { enabled: false },
				toolbar: { show: false },
				sparkline: { enabled: true },
				tooltip: { enabled: false },
			},
			dataLabels: {
				enabled: false,
			},
			stroke: {
				curve: "straight",
				lineCap: "round",
				width: 4,
			},
			grid: {
				show: false,
			},
			xaxis: {
				show: false,
				labels: { show: false },
				axisBorder: { show: false },
				axisTicks: { show: false },
				tooltip: { enabled: false },
			},
			yaxis: {
				show: false,
			},
		};
	}

	generatedLeadsChartOptionsF() {
		this.generateLeadsChartOptions = {
			series: [44, 55, 13, 43],
			labels: ["Organic Search", "Referrals", "Social Media", "Direct Link"],
			chart: {
				type: "donut",
				sparkline: { enabled: true },
				width: 150,
				stroke: {
					show: false,
					colors: ["#000"],
					fill: {
						color: ["#000"],
					},
				},
			},
			plotOptions: {
				pie: {
					expandOnClick: false,
					donut: {
						background: "#000",
					},
				},
			},
			stroke: {
				show: false,
				colors: ["#000"],
			},
			theme: {
				monochrome: {
					enabled: true,
					color: "#255aee",
					shadeTo: "light",
					shadeIntensity: 0.65,
				},
			},
			responsive: [
				{
					breakpoint: 480,
					options: {
						chart: {
							width: 200,
						},
						legend: {
							position: "bottom",
						},
					},
				},
			],
		};
		this.totalValue = this.generateLeadsChartOptions.series.reduce((prev: any, curr: any) => prev + curr, 0);
	}

	revenueReportOptionsF() {
		this.revenueReportOptions = {
			series: [
				{
					name: "Males",
					data: [100, 200, 250, 100, 200, 250, 100, 200, 250],
				},
				{
					name: "Females",
					data: [-100, -150, -200, -100, -150, -200, -100, -150, -200],
				},
			],
			chart: {
				type: "bar",
				stacked: true,
				toolbar: { show: false },
				// tooltip: { enabled: false },
				height: 330,
				width: 400,
			},

			colors: ["#7367f0", "#ff9f43"],

			plotOptions: {
				bar: {
					horizontal: false,
					barHeight: "75%",
					columnWidth: 10,
					borderRadius: 5,
					borderRadiusWhenStacked: "all",
				},
			},

			dataLabels: {
				enabled: false,
			},

			xaxis: {
				labels: {
					show: false,
				},
				axisTicks: { show: false },
				tooltip: { enabled: false },
				axisBorder: {
					show: false,
				},
			},
			yaxis: {
				axisTicks: { show: false },
				tooltip: { enabled: false },
				axisBorder: {
					show: false,
				},
			},

			legend: {
				position: "top",
				horizontalAlign: "left",
				labels: {
					colors: this.currentTheme === "dark" ? "#d0d4f1" : "#2f2b3d",
				},
			},
			grid: {
				xaxis: {
					lines: {
						show: false,
					},
				},
				yaxis: {
					lines: {
						show: false,
					},
				},
			},
			// width: 5
		};
	}

	BudgetChartOptionsF() {
		this.BudgetLineChartOptions = {
			series: [
				{
					data: [10, 5, 20, 15, 18, 4, 30, 25, 27, 15, 28],
				},
			],
			chart: {
				height: 100,
				width: 170,
				type: "line",
				zoom: { enabled: false },
				toolbar: { show: false },
				sparkline: { enabled: true },
				tooltip: { enabled: false },
			},
			dataLabels: {
				enabled: false,
			},
			stroke: {
				curve: "smooth",
				lineCap: "round",
				width: 4,
			},
			grid: {
				show: false,
			},
			xaxis: {
				show: false,
				labels: { show: false },
				axisBorder: { show: false },
				axisTicks: { show: false },
				tooltip: { enabled: false },
			},
			yaxis: {
				show: false,
			},
		};
	}

	earningChartOptionsF() {
		this.earningChartOptions = {
			series: [
				{
					name: "Series A",
					data: [30, 60, 40, 50, 40, 55, 85],
				},
			],
			chart: {
				type: "bar",
				height: 210,
				stacked: true,
				toolbar: {
					show: false,
				},
				zoom: {
					enabled: false,
				},
			},
			xaxis: {
				categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
				axisBorder: {
					show: false,
				},
				axisTicks: {
					show: false,
				},
				labels: {
					style: {
						colors: this.currentTheme === "dark" ? "#d0d4f1" : "#2f2b3d",
					},
				},
			},
			yaxis: {
				labels: {
					show: false,
				},
			},
			plotOptions: {
				bar: {
					horizontal: false,
				},
			},
			legend: {
				position: "right",
				offsetY: 40,
			},
			colors: "#7367f0",
			dataLabels: {
				enabled: false,
			},
			grid: {
				show: false,
			},
		};
	}
}
