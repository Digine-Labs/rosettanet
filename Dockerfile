# Use the base image from Shard Labs
FROM shardlabs/starknet-devnet-rs:774c0c60c54c8da2f5aa1e12157207ba110b219f-seed0

# Expose port 5050 for communication
EXPOSE 5050

# Set the default command to run the devnet with custom arguments
CMD []
