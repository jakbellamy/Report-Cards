echo "Generating Data"
python3 data_generator.py
echo "Generating Plots"
python3 share_graphs.py
echo "Generating Report Cards (Headless)"
python3 headless_process.py
echo "Complete"
